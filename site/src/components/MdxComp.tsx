import { A, Title } from 'solid-start'

export const components = {
  h1: props => (
    <h1 {...props}>
      <Title>Erand — {props.children}</Title>
      {props.children}
    </h1>
  ),
  ssr: props => <>{props.children}</>,
  spa: props => <></>,
  p: props => <p {...props}>{props.children}</p>,
  a: props => <A {...props}>
    {props.children}
  </A>
}