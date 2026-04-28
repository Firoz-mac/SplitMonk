import logo from './Splitzy.png';
import profileImg1 from './profileImg1.jpg';
import homeBanner from './splitzyHome1.jpg';
import vector from './vector.png'
import splitIcon from './splitIcon.png'
import group from './group.png'
import speed from './speed.png'
import mockup from './mockup.png'
import check from './check.png'
import safeVec from './safeVec.png'
import safeVec2 from './safeVec2.png'
import safeVec3 from './safeVec3.png'
import test from './test.png'
import test1 from './test1.png'
import unt from './Untitled-1.png'
import shoppingIcon from './ShoppingIcon.png'
import foodIcon from './foodIcon.png'
import travelIcon from './travelIcon.png'

export const assets = {
    logo,
    profileImg1,
    homeBanner,
    vector,
    splitIcon,
    group,
    speed,
    mockup,
    check,
    safeVec,
    safeVec2,
    safeVec3,
    test,
    test1,
    unt,
    shoppingIcon,
    foodIcon,
    travelIcon,
};

export const features = [
    {
        title: "Smart Expense Splitting",
        description: "Split bills instantly with friends and track who owes what without confusion.",
        icon: assets.splitIcon,
        bg: "from-pink-200 to-pink-300",
    },
    {
        title: "Group Management",
        description: "Create groups, add expenses, and manage shared costs effortlessly.",
        icon: assets.group,
        bg: "from-pink-200 to-pink-300",
    },
    {
        title: "Real-time Balance",
        description: "Stay updated with live balances and never miss a settlement.",
        icon: assets.speed,
        bg: "from-purple-200 to-purple-300",
    },
];

export const Faqs = [
    {
        question: 'What is SplitMonk?',
        answer: 'SplitMonk is a smart expense-sharing app that helps you split bills with friends, roommates, or groups. It tracks who owes what and simplifies settling up.'
    },
    {
        question: 'How does SplitMonk calculate who owes whom?',
        answer: 'SplitMonk automatically calculates balances based on expenses added in a group. It minimizes the number of transactions so everyone settles up easily.'
    },
    {
        question: 'Can I split expenses unevenly?',
        answer: 'Yes! You can split expenses equally, by percentage, or enter exact amounts for each person.'
    },
    {
        question: 'Is my data safe on SplitMonk?',
        answer: 'Yes. SplitMonk uses secure authentication and encrypted data storage to keep your information safe.'
    },
    {
        question: 'What happens if I enter the wrong expense?',
        answer: 'You can delete any expense anytime, and balances will be recalculated instantly.'
    },
];

export const mainFeatures = [
    {
        title: 'Track every expense effortlessly',
        subTitle: 'Keep your finances organized without the stress.',
        img: assets.mockup,
        features: [
            'Real-time expense tracking with clear insights',
            'Smart categorization for better understanding',
            'Daily, weekly, and monthly breakdowns'
        ]
    },
    {
        title: 'Easily split bills with friends!',
        subTitle: 'No more awkward calculations or confusion.',
        img: assets.mockup,
        features: [
            'Split equally or customize amounts',
            'Add multiple friends to a split',
            'Automatic balance calculation'
        ]
    },
    {
        title: 'Understand your spending habits',
        subTitle: 'Make smarter financial decisions with insights.',
        img: assets.mockup,
        features: [
            'Visual reports',
            'Category-wise expense analysis',
            'Budget tracking and limits'
        ]
    },

];