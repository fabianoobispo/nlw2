module.exports = async function(db, {helperValue, classValue, classScheduleValues}) {
    //inserir dados na tablea de helpers de
    const insertedHelper = await db.run(`
        INSERT INTO helpers (
            name,
            avatar,
            whatsapp,
            bio
            ) VALUES (
                "${helperValue.name}",   
                "${helperValue.avatar}",
                "${helperValue.whatsapp}",
                "${helperValue.bio}"
            );
    `)

    const helper_id = insertedHelper.lastID


    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                helper_id
            )VALUES(
                "${classValue.subject}",
                "${classValue.cost}",
                "${helper_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schadule
    
const insertedAllClassesSchedule =  classScheduleValues.map((classScheduleValue) =>{
    return db.run(`
    INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
    ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
    );
`)
})
   await Promise.all(insertedAllClassesSchedule)

}