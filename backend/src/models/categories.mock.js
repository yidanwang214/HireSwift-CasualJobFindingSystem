const categories = new Map();
const categoriesList = [
  {
    category: 'Others',
    id: 0,
  },
  {
    category: 'Accounting',
    id: 1,
  },
  {
    category: 'Administration & Office Support',
    id: 2,
  },
  {
    category: 'Advertising, Arts & Media',
    id: 3,
  },
  {
    category: 'Banking & Financial Services',
    id: 4,
  },
  {
    category: 'Call Centre & Customer Service',
    id: 5,
  },
  {
    category: 'CEO & General Management',
    id: 6,
  },
  {
    category: 'Community Services & Development',
    id: 7,
  },
  {
    category: 'Construction',
    id: 8,
  },
  {
    category: 'Consulting & Strategy',
    id: 9,
  },
  {
    category: 'Design & Architecture',
    id: 10,
  },
  {
    category: 'Education & Training',
    id: 11,
  },
  {
    category: 'Engineering',
    id: 12,
  },
  {
    category: 'Farming, Animals & Conservation',
    id: 13,
  },
  {
    category: 'Government & Defence',
    id: 14,
  },
  {
    category: 'Healthcare & Medical',
    id: 15,
  },
  {
    category: 'Hospitality & Tourism',
    id: 16,
  },
  {
    category: 'Human Resources & Recruitment',
    id: 17,
  },
  {
    category: 'Information & Communication Technology',
    id: 18,
  },
  {
    category: 'Insurance & Superannuation',
    id: 19,
  },
  {
    category: 'Legal',
    id: 20,
  },
  {
    category: 'Manufacturing, Transport & Logistics',
    id: 21,
  },
  {
    category: 'Marketing & Communications',
    id: 22,
  },
  {
    category: 'Mining, Resources & Energy',
    id: 23,
  },
  {
    category: 'Real Estate & Property',
    id: 24,
  },
  {
    category: 'Retail & Consumer Products',
    id: 25,
  },
  {
    category: 'Sales',
    id: 26,
  },
  {
    category: 'Science & Technology',
    id: 27,
  },
  {
    category: 'Self Employment',
    id: 28,
  },
  {
    category: 'Sport & Recreation',
    id: 29,
  },
  {
    category: 'Trades & Services',
    id: 30,
  },
];
categoriesList.forEach((c) => {
  categories.set(c.id, c.category);
});

module.exports = categories;
