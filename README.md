# Lhind

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npm run start
```

To create a production bundle:

```sh
npm run build
```


## Architecture

#### Module federation for micro-frontend architecture
#### RxJS for state management
#### Route-based code splitting
#### Shared component libraries

## Usability

The page manages the functionality by states, you can change the selected list between trips and expenses category by cliclikg on the card to select an expense and clicking again to deavtivate the card and go back to trips.
The form updating happens on form change, there is no need for a save button the elements is automatically updated when something changes within the form.

## Lhind used dynamic module federation

Lhind consists on two remote applications specifically `login` and `dashboard` which serves as the host application

## The idea behind the architecture:

Lhind app uses dynamic logic whenever possible. It consists on 3 main components:

```sh
dynamic-form-congainer
```

is the component which dynamically generates the forms out of the objects defined.
forms included:

-trips
-car rental
-hotel
-flight
-taxi


```sh
dynamic-list-container
```
is the component which holds dynamically the list of elements in a list fashion.
Everything is dynamically loaded from trips to expense elements

```sh
expense-cards-container
```

In this components expenses are loaded in clickable cards which handle the loading of the corresponding elements in the `dynamic-list-container` 

```sh
declarative component
```

This is the wrapper of the 3 components above 

## Shared libraries:

Levetating nx by including shared libraries

```sh
data-access-user
```

Holds the logic for the authenticating the user by holding the service which provides logging in and logging out


```sh
header and footer
```

these two are pretty much self explanatory. Declared in the shared libs component

## Guards & Auth

```sh
auth.guard
```

Guard Protecting routes if the user is not authenticated

```sh
logged-in-guard
```

Another guard preventing authenticated user from acceesing login route

## Styling

For this application no styling library is used everything is based on flex and mainly inline styling
This is to keep the application as lightweight as possible and also for a fun challenge :D

