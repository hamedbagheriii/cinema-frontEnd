import jMoment from 'moment-jalaali'

export const convertDate = (date : string,format='jYYYY/jMM/jDD')=>{
    return (jMoment(date).format(format))
}
