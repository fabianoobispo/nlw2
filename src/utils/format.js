const subjects = [
    "Artes",
    "Bilogia",
    "Ciência",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const possition = +subjectNumber -1

    return subjects[possition]
}

function ConvertHooursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60)+ minutes)
}

module.exports = {
    getSubject,
    weekdays,
    subjects,
    ConvertHooursToMinutes
}