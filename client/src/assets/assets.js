import logo from './Splitzy.png';
import profileImg1 from './profileImg1.jpg';
import homeBanner from './splitzyHome1.jpg';
import vector from './vector.png'
import splitIcon from './splitIcon.png'
import group from './group.png'
import speed from './speed.png'
import mockup from './mockup.png'
import check from './check.png'
import card from './card.png'
import groupIllustration from './groupIllustration.png'
import indivi1Illustration from './indivi1Illustration.png'
import indivi2Illustration from './indivi2Illustration.png'
import { BsFillLightningFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { GrGoogleWallet } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { TbClipboardTextFilled } from "react-icons/tb";
import { BsShieldFill } from "react-icons/bs";


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
    card,
    groupIllustration,
    indivi1Illustration,
    indivi2Illustration
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

export const splitCardBenefits = [
    {
      label: 'Get digital card instantly',
      icon: BsFillLightningFill
    },
    {
      label: 'Easy to manage',
      icon: IoMdSettings
    },
    {
      label: 'Pay from one place',
      icon: GrGoogleWallet
    },
    {
      label: 'Spend together',
      icon: FaUsers
    },
    {
      label: 'Track every spend',
      icon: TbClipboardTextFilled

    },
    {
      label: 'Stress-free spending',
      icon: BsShieldFill

    }
];

export const splitCardDetails = [
    {
      title: 'No more asking “who paid?”',
      description: 'Every payment and contribution is tracked automatically, so the whole group always knows who paid and when.',
      image: groupIllustration,
      bg: 'bg-[#f3ffd9]'
    },
    {
      title: 'Avoid messy expense calculations',
      description: 'handles shared spending clearly, helping you avoid manual calculations and payment confusion.',
      image: indivi1Illustration,
      bg: 'bg-[#e4ffdc]'
    },
    {
      title: 'Makes expenses easier to manage',
      description: 'Keep all group transactions, balances, and activity in one place for a smoother and more organized experience.',
      image: indivi2Illustration,
      bg: 'bg-[#defff7]'
    },
]