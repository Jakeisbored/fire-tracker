alert = (type , code) => {
    // Declarations
    const types = {
          'P':'Parameter',
          'T':'Token' ,
          'M':'Missing Weapon',
          'Mc':'Missing Category',
          'D':'Default'
          },
          codes = [404,200,'Non specified'];
    // Assigning -type- and -code- to values according to user input
    type = types[type] ? types[type] : types['D'];
    code = codes.includes(code) ? code : codes[2];
    // Returning the actual error
	return `An error occured / Type : ${type} / Code : ${code}`;
}
