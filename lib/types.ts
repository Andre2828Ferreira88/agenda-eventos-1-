export type UiEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start: string;
  end?: string;
  marca?: string;
  categoria?: string;
  cidade?: string;
  updated?: string;
};

export type EventsResponse = { items: UiEvent[] };
