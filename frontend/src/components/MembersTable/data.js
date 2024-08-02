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


export {columns, statusOptions};
