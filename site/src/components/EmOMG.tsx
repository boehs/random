export default function EmOMG(props: {
    src?: string
    giphy?: string
    kym?: string
    alt: string
}) {
    let emoji = props.src
    || props.giphy ? `https://media.giphy.com/media/${props.giphy}/giphy.gif` : false
    || props.kym ? `https://i.kym-cdn.com/photos/images/newsfeed/${props.kym}.jpg` : false
    
    return <i class="emoji"><img src={emoji} alt={props.alt}/></i>
}