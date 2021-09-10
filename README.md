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
    return <div>Home page</div>;
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

