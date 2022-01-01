export interface SignupObject {
  email: string;
  password: string;
  matchingPw: boolean;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  // How to store this? s3 bucket with a reference? 
  climbingStyles: 'toperope' | 'lead' | 'boulder' | '';
  trWarmUp: string;
  trOnsight: string;
  trRedpoint: string;
  leadWarmUp: string;
  leadOnsight: string;
  leadRedpoint: string;
  boulderWarmUp: string;
  boulderOnsight: string;
  boulderRedpoint: string;
  preferredCrags: string;
  //Crag reference? 
}