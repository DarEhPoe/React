
//const data={
//    employees:require('../model/employees.json'),
//    setEmployees:function(data){this.employees=data}
//
//};

const Employee=require('../model/Employee');
const getAllEmployees= async (req,res)=>{
    const employees= await Employee.find();
    if(!employees) return res.status(204).json({'message':'no employee found!'})
    res.json(employees);
}

const createNewEmployees= async(req,res)=>{
    //const newEmployee={
    //    id: data.employees[data.employees.length-1].id+1 || 1,
    //    firstname:req.body.firstname,
    //    lastname:req.body.lastname
    //}
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({'message':'First and last names are required.'})
    }
    try{
        const result=await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname
        });
        res.status(201).json(result);

    }catch(err){
        console.error(err);
    }

    //data.setEmployees([...data.employees,newEmployee]);
    //res.status(201).json(data.employees);
}

const updateEmployees= async(req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message':'ID is required'});
    }
    //const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    const employee=await Employee.findOne({_id:req.body.id}).exec();
    if(!employee){
        return res.status(204).json({"message":`No Employee ID mathc ${req.body.id} `});
    }
    if(req.body.firstname)employee.firstname=req.body.firstname;
    if(req.body.lastname)employee.lastname=req.body.lastname;
    //const filterArray=data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    //const unsortedArray=[...filterArray,employee];
    //data.setEmployees(unsortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0))
    //res.json(data.employees);
    const result= await employee.save();
    res.json(result);
}

const deleteEmployees=async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message':'ID is required'});
    }
    //const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    const employee=await Employee.findOne({_id:req.body.id}).exec();
    if(!employee){
        return res.status(204).json({"message":`No Employee ID mathc ${req.body.id} `});
    }
    const result= await Employee.deleteOne({_id:req.body.id});

    //const employee=data.employees.find(emp=>emp.id===parseInt(req.body.id));
    //if(!employee){
    //    return res.status(400).json({"message":`Employee ID ${req.body.id} not found`});
    //}
    //const filterArray=data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    //data.setEmployees([...filterArray])
    res.json(result);
}

const getEmployees=async(req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({'message':'ID is required'});
    }
    //const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    const employee=await Employee.findOne({_id:req.params.id}).exec();
    if(!employee){
        return res.status(204).json({"message":`No Employee ID mathc ${req.params.id} `});
    }


    //const employee=data.employees.find(emp=>emp.id === parseInt(req.params.id));
    //if(!employee){
    //    return res.status(400).json({"message":`Employee ID ${req.params.id} not found`});
    //}
    res.json(employee);
}

module.exports={
    getAllEmployees,
    createNewEmployees,
    updateEmployees,
    deleteEmployees,
    getEmployees
}