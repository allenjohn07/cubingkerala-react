const columns = [
  {name: "WCA ID", uid: "id"},
  {name: "NAME", uid: "name", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "MAIN EVENT", uid: "event"},
  {name: "STATUS", uid: "status", sortable: true},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

// const users = [
//   {
//     id: '2017JOHN15',
//     name: "Tony Reichert",
//     role: "CEO",
//     event: "Management",
//     status: "active",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     username: "zoey.lang@example.com",
//   },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Zoey Lang",
//   //   role: "Tech Lead",
//   //   event: "Development",
//   //   status: "paused",
//   //   age: "25",
//   //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//   //   email: "zoey.lang@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Jane Fisher",
//   //   role: "Sr. Dev",
//   //   event: "Development",
//   //   status: "active",
//   //   age: "22",
//   //   avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//   //   email: "jane.fisher@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "William Howard",
//   //   role: "C.M.",
//   //   event: "Marketing",
//   //   status: "vacation",
//   //   age: "28",
//   //   avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//   //   email: "william.howard@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Kristen Copper",
//   //   role: "S. Manager",
//   //   event: "Sales",
//   //   status: "active",
//   //   age: "24",
//   //   avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//   //   email: "kristen.cooper@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Brian Kim",
//   //   role: "P. Manager",
//   //   event: "Management",
//   //   age: "29",
//   //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//   //   email: "brian.kim@example.com",
//   //   status: "active",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Michael Hunt",
//   //   role: "Designer",
//   //   event: "Design",
//   //   status: "paused",
//   //   age: "27",
//   //   avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
//   //   email: "michael.hunt@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Samantha Brooks",
//   //   role: "HR Manager",
//   //   event: "HR",
//   //   status: "active",
//   //   age: "31",
//   //   avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
//   //   email: "samantha.brooks@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Frank Harrison",
//   //   role: "F. Manager",
//   //   event: "Finance",
//   //   status: "vacation",
//   //   age: "33",
//   //   avatar: "https://i.pravatar.cc/150?img=4",
//   //   email: "frank.harrison@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Emma Adams",
//   //   role: "Ops Manager",
//   //   event: "Operations",
//   //   status: "active",
//   //   age: "35",
//   //   avatar: "https://i.pravatar.cc/150?img=5",
//   //   email: "emma.adams@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Brandon Stevens",
//   //   role: "Jr. Dev",
//   //   event: "Development",
//   //   status: "active",
//   //   age: "22",
//   //   avatar: "https://i.pravatar.cc/150?img=8",
//   //   email: "brandon.stevens@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Megan Richards",
//   //   role: "P. Manager",
//   //   event: "Product",
//   //   status: "paused",
//   //   age: "28",
//   //   avatar: "https://i.pravatar.cc/150?img=10",
//   //   email: "megan.richards@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Oliver Scott",
//   //   role: "S. Manager",
//   //   event: "Security",
//   //   status: "active",
//   //   age: "37",
//   //   avatar: "https://i.pravatar.cc/150?img=12",
//   //   email: "oliver.scott@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Grace Allen",
//   //   role: "M. Specialist",
//   //   event: "Marketing",
//   //   status: "active",
//   //   age: "30",
//   //   avatar: "https://i.pravatar.cc/150?img=16",
//   //   email: "grace.allen@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Noah Carter",
//   //   role: "IT Specialist",
//   //   event: "I. Technology",
//   //   status: "paused",
//   //   age: "31",
//   //   avatar: "https://i.pravatar.cc/150?img=15",
//   //   email: "noah.carter@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Ava Perez",
//   //   role: "Manager",
//   //   event: "Sales",
//   //   status: "active",
//   //   age: "29",
//   //   avatar: "https://i.pravatar.cc/150?img=20",
//   //   email: "ava.perez@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Liam Johnson",
//   //   role: "Data Analyst",
//   //   event: "Analysis",
//   //   status: "active",
//   //   age: "28",
//   //   avatar: "https://i.pravatar.cc/150?img=33",
//   //   email: "liam.johnson@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Sophia Taylor",
//   //   role: "QA Analyst",
//   //   event: "Testing",
//   //   status: "active",
//   //   age: "27",
//   //   avatar: "https://i.pravatar.cc/150?img=29",
//   //   email: "sophia.taylor@example.com",
//   // },
//   // {
//   //   id: '2017JOHN15',
//   //   name: "Lucas Harris",
//   //   role: "Administrator",
//   //   event: "Information Technology",
//   //   status: "paused",
//   //   age: "32",
//   //   avatar: "https://i.pravatar.cc/150?img=50",
//   //   email: "lucas.harris@example.com",
//   // },
//   {
//     id: '2017JOHN25',
//     name: "Mia Robinson",
//     role: "Coordinator",
//     event: "Operations",
//     status: "active",
//     avatar: "https://i.pravatar.cc/150?img=45",
//     username: "mia.robinson@example.com",
//   },
// ];


// export const animals = [
//   {key: "cat", label: "Cat"},
//   {key: "dog", label: "Dog"},
//   {key: "elephant", label: "Elephant"},
//   {key: "lion", label: "Lion"},
//   {key: "tiger", label: "Tiger"},
//   {key: "giraffe", label: "Giraffe"},
//   {key: "dolphin", label: "Dolphin"},
//   {key: "penguin", label: "Penguin"},
//   {key: "zebra", label: "Zebra"},
//   {key: "shark", label: "Shark"},
//   {key: "whale", label: "Whale"},
//   {key: "otter", label: "Otter"},
//   {key: "crocodile", label: "Crocodile"}
// ];

export {columns, statusOptions};
