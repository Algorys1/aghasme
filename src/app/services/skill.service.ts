import { Injectable } from '@angular/core';
import { Skill, OrbType, ALL_SKILLS } from '../models/skills.model';

export interface LearnedSkill {
  skill: Skill;
  level: number;
  xp: number;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private learnedSkills: LearnedSkill[] = [];

  // Récupérer toutes les compétences connues
  getSkills(): LearnedSkill[] {
    return this.learnedSkills;
  }

  // Vérifier si une compétence est déjà apprise
  hasSkill(skillKey: string): boolean {
    return this.learnedSkills.some(s => s.skill.key === skillKey);
  }

  // Apprendre une compétence
  learnSkill(skillKey: string): boolean {
    if (this.hasSkill(skillKey)) return false;

    const skill = ALL_SKILLS.find(s => s.key === skillKey);
    if (!skill) return false;

    this.learnedSkills.push({
      skill,
      level: 1,
      xp: 0,
    });

    return true;
  }

  // Gagner de l’XP sur une compétence
  gainXp(skillKey: string, amount: number): void {
    const learned = this.learnedSkills.find(s => s.skill.key === skillKey);
    if (!learned) return;

    learned.xp += amount;

    // Simple système de progression : 100 XP = 1 niveau
    const requiredXp = learned.level * 100;
    if (learned.xp >= requiredXp) {
      learned.level++;
      learned.xp = 0; // reset pour le prochain palier
      console.log(`Skill ${learned.skill.name} leveled up to ${learned.level}!`);
    }
  }

  // Compétences disponibles par orbe (filtrage)
  getAvailableSkillsForOrb(orb: OrbType, advanced = false): Skill[] {
    return ALL_SKILLS.filter(s => s.orb === orb && s.advanced === advanced);
  }
}
