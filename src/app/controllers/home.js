import User from '~/app/models/User';

class HomeController {
  index = async (_, res) => {
    const users = await User.query();
    console.log(users)
    res.status(200).json({message: 'ជំរាបសួរ'});
  };
}

export default new HomeController();
