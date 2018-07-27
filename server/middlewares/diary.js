
export function DiaryMiddleware(req, res, next){

  const errors = {};

  const { entry_title, entry_content } = req.body;

  if(!entry_title){
    Object.assign(
      errors, 
      {entry_title: "This field is required"}
    );
  }

  if(!entry_content){
    Object.assign(
      errors, 
      {entry_content: "This field is required"}
    );
  }

  if(Object.keys(errors).length){
    return res.status(400).json({
      errors,
    })
  }

  next();
}
