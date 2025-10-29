// Common types for shared stores
// Common store patterns
export interface BaseEntity {
  id: string;
}

export interface OrderedEntity extends BaseEntity {
  order: number;
}

export interface VisibilityEntity extends BaseEntity {
  isVisible: boolean;
}

// Common store state patterns
export interface ModalState {
  isModalOpen: boolean;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: string | null;
}

// Combined common states
export interface AsyncState extends LoadingState, ErrorState {}