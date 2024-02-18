export interface Coordinate {
  lat: string;
  lng: string;
}

export interface Address {
  direction: string;
  coordinate: Coordinate;
}

export interface Task {
  id: string;
  description: string;
  assigned: boolean;
}

export interface Schedule {
  from: string;
  end: string;
  timezone: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  address: Address;
  tasks: Task[];
  open: boolean;
  schedule: Schedule;
  shipping_methods: ShippingMethod[];
}
