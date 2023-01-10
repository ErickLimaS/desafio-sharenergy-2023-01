export default function convertDate(date: Date){

    // reformat Unix date to be more friendly
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`

}