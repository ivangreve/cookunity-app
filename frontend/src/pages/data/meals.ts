import { Meal } from "../../models/Meal.model";

export const MEALS_MOCK = [
  new Meal({
    id: 1,
    name: "Grilled Salmon with Lemon and Herbs",
    chef: "John Smith",
    description: "Fresh salmon fillet grilled to perfection, served with a tangy lemon and herb sauce.",
    rating: {
      average: 4.5,
      count: 10
    },
    image: "https://static01.nyt.com/images/2017/04/14/dining/14COOKING-SALMON-WITH-LEMON/14COOKING-SALMON-WITH-LEMON-master768.jpg?w=1280&q=75"
  }),
  new Meal({
    id: 2,
    name: "Pan-Seared Scallops with Brown Butter",
    chef: "John Smith",
    description: "Jumbo sea scallops seared to a golden brown and finished with a rich brown butter sauce.",
    rating: {
      average: 4.2,
      count: 8
    },
    image: "https://www.jerseygirlcooks.com/wp-content/uploads/2021/02/beer-scallops.jpg"
  }),
  new Meal({
    id: 3,
    name: "Braised Short Ribs",
    chef: "Emily Jones",
    description: "Tender short ribs braised in a rich red wine sauce, served with mashed potatoes.",
    rating: {
      average: 4.7,
      count: 6
    },
    image: "https://www.thehungryhutch.com/wp-content/uploads/2020/12/Simple-Braised-Beef-Short-Ribs-Recipe-HERO-720x540.jpg"
  }),
  new Meal({
    id: 4,
    name: "Macaroni and Cheese with Truffle Oil",
    chef: "Emily Jones",
    description: "Creamy macaroni and cheese made with a blend of artisanal cheeses and finished with a drizzle of truffle oil.",
    rating: {
      average: 4.0,
      count: 9
    },
    image: "https://theviewfromgreatisland.com/wp-content/uploads/2019/01/truffle-macaroni-and-cheese-3994-January-06-2019.jpg"
  })
];