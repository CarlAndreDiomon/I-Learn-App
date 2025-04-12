import { Student, Teacher } from "../Model/usersSchema";
import bcrypt from "bcrypt";

// Function to register a student
export const registerStudent = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        
        if(
            !username ||
            !email ||
            !password 
        ){
            return res.status(400).send({message: "Complete All fields"})
        }
        // Check if the student already exists
        let student = await Student.findOne({email});
        if(student){
            return res.status(400).send({message: "Student already exist!"})
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            fullName,
            email,
            password: hashedPassword,
        });

        await newStudent.save();
        return res.status(201).send({message: "Student created successfully",
            username: Student.username,
            email: Student.email,
            password: Student.password,
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering student", error });
        console.error("Error registering student:", error);
    }
};

// Function to login a student
export const loginStudent = async(req, res) => {
    const {username, password} = req.body;

    try {
        if(
            !username ||
            !password
        ){
            return res.status(400).send({message: "Please enter all fields"})
        }

        const student = await Student.findOne({username})
        if(!student){
            return res.status(400).send({message: 'User not exists'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, student.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Wrong credentials"})
        }

        res.status(200).json({message: "Login successfully",
            _id: student._id,
            username: student.username,
            email: student.email
        });
    } catch (error) {
        console.error("Error in studentController login", error)
        return res.status(400).send({message: "Internal server error"});
    }
}

// Function to register a teacher
export const registerTeacher = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({
            fullName,
            email,
            password: hashedPassword,
        });

        await newTeacher.save();

        return res.status(201).send({message: "Student created successfully",
            username: Teacher.username,
            email: Teacher.email,
            password: Teacher.password,
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering teacher", error });
        console.error("Error registering teacher:", error);
    }
};

// Function to login a teacher
export const loginTeacher = async(req, res) => {
    const {email, password} = req.body;
    try {
        if(
            !email ||
            !password
        ){
            return res.status(400).send({message: "Please complete all fields"});
        }

        const teacher = await Teacher.findOne({email});
        if(!email){
            return res.status(400).send({message: "User not exists"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Wrong credentials"});
        }

        res.status(200).json({message: "Login successfully",
            _id: teacher._id,
            username: teacher.username,
            password: teacher.password
        });
    } catch (error) {
        console.error("Error in teacherController login", error)
        return res.status(400).send({message: "Internal server error"});
    }
};