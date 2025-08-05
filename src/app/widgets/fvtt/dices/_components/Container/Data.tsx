'use client';

import type { FVTTAbilityType, FVTTSkillType, FVTTRollTypes } from '@/libs/fvtt/types';

import translations from '@/translations';

import styles from './FvttRollsContainer.module.scss';

interface Props {
  visible: boolean;
  rollValue: number;
  rollFlavor?: string;
  rollType?: FVTTRollTypes;
  rollOption?: FVTTAbilityType | FVTTSkillType;
  actorName?: string;
  actorImage?: string;
  actorRace?: string;
  actorClass?: string;
  actorLevel?: number;
}

const t = translations.fvtt;

const Data = ({
  visible,
  rollValue,
  rollFlavor,
  rollType,
  rollOption,
  actorName,
  actorImage,
  actorRace,
  actorClass,
  actorLevel,
}: Props) => {
  const hasRaceclass = Boolean(actorRace || actorClass);
  const rollDescription = rollOption ? t.rollsNames[rollOption] : rollFlavor;

  return (
    <div className={styles.container} style={{ opacity: visible ? 1 : 0 }}>
      <div className={styles.portrait} style={{ backgroundImage: `url("${actorImage}")` }}>
        {!actorImage && '?'}
      </div>
      <div className={styles.backdrop}>
        <div className={styles.levelContainer}>
          {Boolean(actorLevel) &&
            (<div className={styles.level}>
                {actorLevel}
              </div>
            )}
        </div>
        <div className={styles.value}>
          {rollValue}
        </div>
        {actorName && (
          <div className={styles.nameWrapper}>
            <div className={styles.name}>
              {actorName}
            </div>
          </div>
        )}
        {hasRaceclass && (
          <div className={styles.raceclass}>
            {actorRace && (
              <div className={styles.race}>
                {actorRace}
              </div>
            )}
            {actorClass && (
              <div className={styles.class}>
                {actorClass}
              </div>
            )}
          </div>
        )}
        <div className={styles.roll}>
          {rollDescription && (
            <div className={styles.rollName}>
              {rollDescription}
            </div>
          )}
          <div className={styles.rollType}>
            {t.rollTypes[rollType || 'simple']}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
