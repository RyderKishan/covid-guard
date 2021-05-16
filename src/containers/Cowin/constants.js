export const maxWidth = {
  xl: '1280px',
  lg: '1280px',
  md: '960px',
  sm: '960px',
  xs: '600px'
};

export const columns = [
  { field: 'center_id', headerName: 'Center Id' },
  { field: 'name', headerName: 'Center Name' },
  { field: 'fee_type', headerName: 'Type' },
  {
    field: 'pincode',
    headerName: 'Pincode',
    type: 'number'
  },
  {
    field: 'noOfSessions',
    headerName: 'No of sessions',
    description: 'This column has a value getter and is not sortable.',
    disableSorting: true,
    valueGetter: (row) => `${(row.sessions || []).length}`
  }
];

export const centersMock = [
  {
    center_id: 138537,
    name: 'Rajapalayam Maternity GH',
    address: 'Main Road Rajapalayam',
    state_name: 'Tamil Nadu',
    district_name: 'Sivakasi',
    block_name: 'Rajapalayam',
    pincode: 626117,
    lat: 9,
    long: 77,
    from: '09:00:00',
    to: '18:00:00',
    fee_type: 'Free',
    sessions: [
      {
        session_id: 'c55d336f-bd96-4634-995a-2da18d342dfb',
        date: '13-05-2021',
        available_capacity: 38,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd6abde71-b236-4ea9-a217-4644b586d469',
        date: '14-05-2021',
        available_capacity: 0,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'bc085de9-5b02-4356-8004-02b4fba2c77b',
        date: '15-05-2021',
        available_capacity: 48,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '7d1c8873-cfda-4c9a-a602-adc8987ac7a2',
        date: '16-05-2021',
        available_capacity: 46,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '729f1963-d7ef-46e3-9b36-3872fd315dc3',
        date: '17-05-2021',
        available_capacity: 49,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'c55d336f-bd96-4634-995a-2da18d342dfb',
        date: '13-05-2021',
        available_capacity: 38,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd6abde71-b236-4ea9-a217-4644b586d469',
        date: '14-05-2021',
        available_capacity: 0,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'bc085de9-5b02-4356-8004-02b4fba2c77b',
        date: '15-05-2021',
        available_capacity: 48,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '7d1c8873-cfda-4c9a-a602-adc8987ac7a2',
        date: '16-05-2021',
        available_capacity: 46,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '729f1963-d7ef-46e3-9b36-3872fd315dc3',
        date: '17-05-2021',
        available_capacity: 49,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'c55d336f-bd96-4634-995a-2da18d342dfb',
        date: '13-05-2021',
        available_capacity: 38,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd6abde71-b236-4ea9-a217-4644b586d469',
        date: '14-05-2021',
        available_capacity: 0,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'bc085de9-5b02-4356-8004-02b4fba2c77b',
        date: '15-05-2021',
        available_capacity: 48,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '7d1c8873-cfda-4c9a-a602-adc8987ac7a2',
        date: '16-05-2021',
        available_capacity: 46,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '729f1963-d7ef-46e3-9b36-3872fd315dc3',
        date: '17-05-2021',
        available_capacity: 49,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      }
    ]
  },
  {
    center_id: 138078,
    name: 'Uppathur Upgraded PHC',
    address: 'Main Road,Uppathur',
    state_name: 'Tamil Nadu',
    district_name: 'Sivakasi',
    block_name: 'Sattur',
    pincode: 626205,
    lat: 9,
    long: 77,
    from: '09:00:00',
    to: '18:00:00',
    fee_type: 'Free',
    sessions: [
      {
        session_id: '88824aa8-19a0-46be-ba78-27d6d31eb057',
        date: '13-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '946eeb7a-37a9-4222-aae7-a07c6fdb1968',
        date: '14-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '148834ab-d1aa-42b5-b6c0-0a92f1307079',
        date: '15-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '957dbdc5-39f7-4817-a2af-984ec1d6654c',
        date: '16-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '878aed0c-f462-4054-88b3-8b07b5d6a5ba',
        date: '17-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'a26d6934-f656-4856-b1a2-441588857d7f',
        date: '18-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd961df76-486c-404c-88cf-3be94ebe2f1f',
        date: '19-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      }
    ]
  },
  {
    center_id: 690720,
    name: 'M Pudupatti BPHC Covaxin',
    address: 'Sivakasi',
    state_name: 'Tamil Nadu',
    district_name: 'Sivakasi',
    block_name: 'Sivakasi',
    pincode: 626130,
    lat: 9,
    long: 77,
    from: '09:00:00',
    to: '18:00:00',
    fee_type: 'Free',
    sessions: [
      {
        session_id: 'e9134472-bd32-4dc3-a840-3a42c2cd3291',
        date: '13-05-2021',
        available_capacity: 43,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd863b7a5-6a4c-4bca-a6c3-f66b313addea',
        date: '14-05-2021',
        available_capacity: 49,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '2a64efd4-79ce-4131-a695-6ffcc19981cf',
        date: '15-05-2021',
        available_capacity: 47,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '621fa012-a3e5-480e-a4ae-eafb7b98564d',
        date: '16-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'd27cfc30-edc9-4da5-97d0-9c4512816f6b',
        date: '17-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'eb542443-a4c1-4f90-ba66-10f419dfed83',
        date: '18-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '6e7c0cff-a4ef-4101-a31b-1a673c430ab7',
        date: '19-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVAXIN',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      }
    ]
  },
  {
    center_id: 138177,
    name: 'Thayilpatti Upgraded PHC',
    address: 'Pasumpom Nagar ,Thayilpatti',
    state_name: 'Tamil Nadu',
    district_name: 'Sivakasi',
    block_name: 'Vembakottai',
    pincode: 626128,
    lat: 9,
    long: 77,
    from: '09:00:00',
    to: '18:00:00',
    fee_type: 'Free',
    sessions: [
      {
        session_id: '6d844d63-8165-4c64-8f77-a7a712349d0c',
        date: '13-05-2021',
        available_capacity: 48,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '1248e830-4926-4c12-980e-9762551e1b36',
        date: '14-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'dea688dd-f039-4f7b-a0a5-05bdf6487a70',
        date: '15-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '792f3fc6-2d4d-44e7-8ab3-1d7a4920db5e',
        date: '16-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '008e204a-e261-4b40-acb1-32d9ecedeeb2',
        date: '17-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: '8d33da6c-574c-49a8-8040-14c4bd246bfa',
        date: '18-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      },
      {
        session_id: 'aadce4eb-4e98-4531-95b7-ccc93b00bafc',
        date: '19-05-2021',
        available_capacity: 50,
        min_age_limit: 45,
        vaccine: 'COVISHIELD',
        slots: [
          '09:00AM-11:00AM',
          '11:00AM-01:00PM',
          '01:00PM-03:00PM',
          '03:00PM-06:00PM'
        ]
      }
    ]
  }
];
