# yarr
Yet another react router


## Why yet another react router?
- Configure by one component (Router) in one place.
- No nesting routes, your view is result of application state not of url
- No relation to browser by default

## How to use

`HomePage.js`
```javascript
  const HomePage = () => {
    return <div>Home page <Link to="/contact"><a href="">Contact page</a></Link></div>;
  };

```

`ContactPage.js`
```javascript
  const ContactPage = () => {
    return <div>Contact page</div>;
  };

```

`App.js`
```js
  import { HomePage } from "./HomePage.js";
  import { ContactPage } from "./ContactPage.js";

  <Router
    routes={[
	    { name: "home", path: "/", component: <HomePage /> },
	    { name: "contact", path: "/contact", component: <ContactPage /> }
	]}
    initRouteName="home"
  />
```

### Router

Router is base of routing. It's get all routes for application and init route for startging as props.
### Link

Represent link html element for navaigate to route by pass props `to` as string of path. If path exists in routes then after click `Router` change current rooute, if not then it throw exception with message "You try navigate to not exists route!"
Link can not be used outside of `Router`.
