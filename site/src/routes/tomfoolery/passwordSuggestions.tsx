import { createResource, For } from "solid-js"
import { useRouteData } from "solid-start"
import { EmOMG } from "~/components/Helpers"

export function routeData() {
    const sl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/'

    const passwordEndpoint = sl + 'Passwords/Common-Credentials/10-million-password-list-top-10000.txt'
    const [passwords] = createResource(async () => (await (await fetch(passwordEndpoint)).text()).split('\n'))

    const usernameEndpoint = sl + 'Usernames/Honeypot-Captures/multiplesources-users-fabian-fingerle.de.txt'
    const [usernames] = createResource(async () => (await (await fetch(usernameEndpoint)).text()).split('\n').slice(250))

    return { passwords, usernames }
}

export default function PasswordSuggestions() {
    const { passwords, usernames } = useRouteData<typeof routeData>()

    return <>
        <h1>Welcome to ACME!</h1>
        <main>
            <div class="toolbar" style={{ height: "500px", "gap": "30px", "align-items": "center" }}>
                <div style={{
                    "background": "url('https://media.istockphoto.com/id/486378867/photo/silhouette-of-a-man-at-the-airport-with-suitcase.jpg?s=2048x2048&w=is&k=20&c=gRzHi5IGTv0ceMlqW9S-N3xXgFYolglfl_A-tDhEsQs='",
                    "background-size": "cover",
                    "background-position": "right",
                    "border-radius": "5px",
                    "height": "100%"
                }} />
                <div>
                    <h2>Login with to you'res ACME account!</h2>
                    <form style={{
                        "display": "flex",
                        "flex-direction": "column",
                        "gap": "5px"
                    }}>
                        <input type="text" placeholder="username" list="usernames" value="jeff@bank.com" />
                        <input type="text" style="-webkit-text-security: disc" list="passwords" placeholder="password go here!" />
                        <input type="submit" value="Login" />
                    </form>
                    <datalist id="usernames">
                        <For each={usernames()}>
                            {username => <option>{username}</option>}
                        </For>
                    </datalist>
                    <datalist id="passwords">
                        <For each={passwords()}>
                            {password => <option>{password}</option>}
                        </For>
                    </datalist>
                </div>
            </div>
            <h2>Some notes <EmOMG giphy="VbnUQpnihPSIgIXuZv" alt="A cat with glasses!" /></h2>
            <details>
                <summary>Click me!</summary>
                <p>
                    Ok so first, this doesn't work on firefox <EmOMG giphy="fvM5D7vFoACAM" alt="Firefox doge." />.
                    Well it does, but the best part, the little password ... that sell the illusion are missing.
                </p>
                <p>
                    This is a quick little hack inspired by the fact that the HTML spec allows password
                    fields to have suggestions provided by <code textContent={"<datalist/>"} />
                </p>
                <p>
                    As far as I'm aware, <b>no browser</b> supports this in actual password inputs, for good reason.
                    For this example, I use <code>-webkit-text-security: disc</code> to make a normal input look like a password field.
                    This really is just an excellent example of where it makes sense to disregard a spec.
                </p>
                <p>
                    Some thanks/stuff/etc
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/danielmiessler/SecLists/">danielmiessler's SecLists</a>
                        &nbsp;for "donating" the usernames and passwords of this site's very real users
                    </li>
                    <li>
                        <a href="https://demo.agektmr.com/datalist/">agektmr.com's datalist examples</a>
                        &nbsp;for real uses for <code textContent={"<datalist/>"} />
                    </li>
                    <li>
                        <a href="https://noppa.github.io/text-security.html">this</a> incredibly stupid polyfill
                        that would "fix" firefox if I wasn't lazy.
                    </li>
                </ul>
            </details>
        </main>
    </>
}