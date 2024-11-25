import { Request, response, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
// import studentValidationSchema from './student.validation';
import studentValidationSchema from './student.validation';
import { z } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod

    const { student: studentData } = req.body;

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using Zod
    const zodparseData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparseData);

    console.log({ error });

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students is retriveyed successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students is retrived successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
