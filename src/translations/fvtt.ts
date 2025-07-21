import {
  FVTTAbilityType,
  FVTTSkillType,
  FVTTRollTypes,
} from '@/libs/fvtt/types';

const rollsNames: Record<FVTTAbilityType | FVTTSkillType, string> = {
  // Abilities
  dex: 'Ловкость',
  wis: 'Мудрость',
  int: 'Интеллект',
  str: 'Сила',
  cha: 'Харизма',
  con: 'Телосложение',
  // Skills
  acr: 'Акробатика',
  ani: 'Уход за животными',
  arc: 'Магия',
  ath: 'Атлетика',
  dec: 'Обман',
  his: 'История',
  ins: 'Проницательность',
  itm: 'Запугивание',
  inv: 'Расследование',
  med: 'Медицина',
  nat: 'Природа',
  prc: 'Внимательность',
  prf: 'Выступление',
  per: 'Убеждение',
  rel: 'Религия',
  slt: 'Ловкость рук',
  ste: 'Скрытность',
  sur: 'Выживание',
};
const rollTypes: Record<FVTTRollTypes | 'simple', string> = {
    simple: 'Простой бросок',
    ability: 'Проверка харрактеристики',
    skill: 'Проверка навыка',
    save: 'Спасбросок',
    tool: 'Инструмент',
  }

const translations = {
  rollsNames,
  rollTypes,
};

export default translations;
