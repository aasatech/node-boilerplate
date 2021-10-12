import Home from '~/app/controllers/home';

export default (route) => {
  route.get("/", Home.index);

  return route;
};