const SKILLS_KEY = 'user_skills';

export function getUserSkills(): string[] {
  const stored = localStorage.getItem(SKILLS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveUserSkills(skills: string[]): void {
  localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
}

export function addUserSkill(skill: string): string[] {
  const skills = getUserSkills();
  if (!skills.includes(skill.toLowerCase().trim())) {
    skills.push(skill.toLowerCase().trim());
    saveUserSkills(skills);
  }
  return skills;
}

export function removeUserSkill(skill: string): string[] {
  const skills = getUserSkills().filter(s => s !== skill.toLowerCase().trim());
  saveUserSkills(skills);
  return skills;
}

export function calculateSkillMatch(userSkills: string[], jobSkills: string[]): {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
} {
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase().trim());
  const normalizedJobSkills = jobSkills.map(s => s.toLowerCase().trim());
  
  const matchedSkills = normalizedJobSkills.filter(skill => 
    normalizedUserSkills.some(userSkill => 
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );
  
  const missingSkills = normalizedJobSkills.filter(skill => 
    !normalizedUserSkills.some(userSkill => 
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );
  
  const matchPercentage = jobSkills.length > 0 
    ? Math.round((matchedSkills.length / jobSkills.length) * 100) 
    : 0;

  return { matchedSkills, missingSkills, matchPercentage };
}
