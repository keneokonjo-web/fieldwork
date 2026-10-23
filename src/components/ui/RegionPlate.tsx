'use client';
import { Plate } from '@/components/ui/Plate';
import { sceneKey, type SceneName } from '@/content/scenes';
import { useRegion } from '@/lib/region';

type PlateProps = Omit<React.ComponentProps<typeof Plate>, 'photo' | 'art'>;

/** A photograph chosen for the visitor's region. See src/content/scenes.ts. */
export function RegionPlate({ slot, ...rest }: { slot: SceneName } & PlateProps) {
  const { region } = useRegion();
  return <Plate photo={sceneKey(slot, region)} {...(rest as object)} />;
}
