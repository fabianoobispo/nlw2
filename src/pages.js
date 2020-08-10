const Database = require('./database/db');

const { subjects, weekdays, getSubject, ConvertHooursToMinutes } = require('./utils/format');


function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query
    

    if(!filters.subject|| !filters.weekday ||!filters.time) {
        return res.render("study.html", {filters, subjects, weekdays})
    }

    //converer horas para minutos
    const timeToMinutes = ConvertHooursToMinutes(filters.time)
    console.log(filters)
    const query = `
        SELECT classes.*, helpers.*
        FROM helpers
        JOIN classes ON (classes.helper_id = helpers.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
        
    `

    //se der erro no banco de dados 
    try {
        const db = await Database
        const helpers = await db.all(query)
         
        helpers.map((helper) => {
            helper.subject = getSubject(helper.subject)
        })
       
        return res.render('study.html', {helpers, filters, subjects, weekdays})
    } catch (error) {
        console.log(error)
        
    }


}
function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays})
}

async function saveGiveClasses(req, res) {
    const createHelper = require('./database/createHelper')

    const helperValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio,
    }    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
      
    }
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
            return {
                weekday,
                time_from: ConvertHooursToMinutes(req.body.time_from[index]),
                time_to: ConvertHooursToMinutes(req.body.time_to[index])
            }
        })

        try {
            const db = await Database
            await createHelper(db, { helperValue, classValue, classScheduleValues})
            
            let queryString = "?subject=" + req.body.subject
            queryString += "&weekday" + req.body.weekday[0]   
            queryString += "&time=" + req.body.time_from[0]


            return res.redirect("/study" + queryString)
        } catch (error) {
            console.log(error)
        }
    }


module.exports = {
    pageStudy,
    pageLanding,
    pageGiveClasses,
    saveGiveClasses
}