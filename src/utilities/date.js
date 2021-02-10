/* //////////////
    description: returns date string in format 'dd/mm/yyyy'
    params: 
        day: string
    ////////////
*/
export const formatDate = (day) => {
    var date = new Date (day);
    var italianDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return {
        italianDate: italianDate
    }
}

/* ///////////////
    description: returns date string in format 'yyyy/mm/dd'
    params: 
        date: date 
    /////////////
*/
export const yyyyMMdd = (date) => {
    var yyyyMMdd = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return  yyyyMMdd;
}