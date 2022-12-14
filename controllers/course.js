const Course = require('../models/course')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler =require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')


// @desc    get all bootcamps 
// @rote    Get /api/v1/courses
// @rote    Get /api/v1/bootcamp/:id/courses
// @access  Public
exports.getCourses = asyncHandler(async(req, res, next) =>{
    if(req.params.bootcampId){
       const courses  = await Course.find({bootcamp: req.params.bootcampId})
       return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
       })
    }else{
       res.status(200).json(res.advanceResults)
        }
 
})

// @desc    get single couse
// @rote    Get /api/v1/courses
// @rote    Get /api/v1/courses/:id/
// @access  Public
exports.getCourse = asyncHandler(async(req, res, next) =>{
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: "name description"
    })
    if(!course){
        return next(new ErrorResponse(`no course with these id of ${req.params.id}`))
    }
  
    res.status(200).json({
        sucess: true,
        data:course
    })
 
})


// @desc    put add couses
// @rote    Put/api/v1/courses
// @rote    put /api/v1/courses/:id/
// @access  private
exports.addCourse = asyncHandler(async(req, res, next) =>{
    req.body.bootcamp = req.params.bootcampId

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if(!bootcamp){
        return next(new ErrorResponse(`no bootcamp with these id of ${req.params.id}`),
              404)
    }
    const course = await Course.create(req.body)
    res.status(200).json({
        sucess: true,
        data:course
    })
 
})




// @desc    put update couses
// @rote    Put/api/v1/courses
// @rote    put /api/v1/courses/:id/
// @access  private
exports.updateCourse = asyncHandler(async(req, res, next) =>{
    let course = await Course.findById(req.params.id);
    if(!course){
        return next(new ErrorResponse(`no course with these id of ${req.params.id}`),
              404)
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        sucess: true,
        data:course
    })
 
})


// @desc    DELETE  couses
// @rote    Put/api/v1/courses
// @rote    put /api/v1/courses/:id/
// @access  private
exports.deleteCourse = asyncHandler(async(req, res, next) =>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return next(new ErrorResponse(`no course with these id of ${req.params.id}`),
              404)
    }
   await course.remove()
    res.status(200).json({
        sucess: true,
        data: {}
    })
 
})