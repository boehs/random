export type Route = {
    description?: string
    children?: {
        [key: string]: Route
    } 
}

export default {
    tomfoolery: {
        description: "What it is on the tin. Dumb things.",
        children: {
            passwordSuggestions: {
                description: 'You ever get tired of entering your password?'
            }
        }
    }
} as {
    [key: string]: Route
}