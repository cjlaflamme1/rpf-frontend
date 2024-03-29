export interface ClimberProfile {
  id?: string;
  trOnly: boolean;
  leadCapable: boolean;
  boulderer: boolean;
  trWarmup?: string;
  trOnsight?: string;
  trRedpoint?: string;
  leadWarmup?: string;
  leadOnsight?: string;
  leadRedpoint?: string;
  boulderWarmup?: string;
  boulderOnsight?: string;
  boulderRedpoint?: string;
  climberBio?: string;
}