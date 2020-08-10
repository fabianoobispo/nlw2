const Database = require('./db')
const createHelper = require('./createHelper')

Database.then(async (db) => {
    //inserir dados 

    helperValue = {
        name: "fabiano bispo",
        avatar: "https://avatars0.githubusercontent.com/u/31293689?s=460&u=38cfddfd13c00d3a11f071bf73b139fdffb2c1c1&v=4",
        whatsapp: "32991678449",
        bio: "Uma descriçao Uma descriçaoUma descriçaoUma descriçaoUma descriçaoUma descriçao",
    }

    classValue ={
        subject: 1,
        cost: "20"
        //o id helper vira pelo banco de dados 
    }

    classScheduleValues = [
        //o id class  vira pelo banco de dados 
        {
            weekday: "1",
            time_from: "720",
            time_to: "1222"
        },
        {
            weekday: "1",
            time_from: "820",
            time_to: "1222"
        }
    ]

    //await createHelper(db, {helperValue, classValue, classScheduleValues})



    //consultar dados 
    //todos os helpers
    const selectedHelpers = await db.all("SELECT * FROM helpers")
    



    //consultar clases de um helper e
    // trazer junto todos os dados do helper 

    const selectClassesAndHelper = await db.all(`
        SELECT classes.*, helpers.*
        FROM helpers
        JOIN classes ON (classes.helper_id = helper_id)
        WHERE classes.helper_id = 1;
    `)
    console.log(selectClassesAndHelper)


    // consultar por aula horario
    
    const delectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "930"
        AND class_schedule.time_to > "1100"
    `)

   console.log(delectClassesSchedule) 
})