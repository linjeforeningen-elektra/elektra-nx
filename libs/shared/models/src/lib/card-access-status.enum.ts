export enum CardAccessStatus {
  /**
   * Activity is empty.
   */
  NONE = 'NONE',
  /**
   * User has access and renewal is being reviewed
   */
  ACTIVE_WAITING = 'ACTIVE_WAITING',
  /**
   * User doesn't have access but renewal is being reviewed
   */
  EXPIRED_WAITING = 'EXPIRED_WAITING',
  /**
   * User has access
   */
  ACTIVE = 'ACTIVE',
  /**
   * User has access, and can ask for renewal
   */
  RENEWABLE = 'RENEWABLE',
  /**
   * User doesn't have access, and can ask for renewal
   */
  EXPIRED = 'EXPIRED',
}
