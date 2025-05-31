const formatDate = (date, time = false) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (time) {
        return new Date(date).toLocaleTimeString('en-US', options);
    }else{
        return new Date(date).toLocaleDateString('en-US', options);
    }
}

export default formatDate;

