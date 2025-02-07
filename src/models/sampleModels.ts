export type SampleSection = {
  title: string;
  body: string;
  inferenced_text: string;
  arguments: SampleArgument[];
};

export type SampleArgument = {
  start: number;
  end: number;
  type: string;
}