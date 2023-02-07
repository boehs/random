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
    },
    test: {
        description: 'just testing the infra here',
        children: {
            plot: {
                description: 'Graphing & Other math capabilities'
            },
            basics: {
                description: 'The basics'
            }
        }
    }
} as {
    [key: string]: Route
}