
export function DiaryMiddleware(req, res, next){

  const errors = {};

  const { entryTitle, entryContent } = req.body;

  if(!entryTitle){
    Object.assign(
      errors, 
      {entryTitle: "This field is required"}
    );
  }

  if(!entryContent){
    Object.assign(
      errors, 
      {entryContent: "This field is required"}
    );
  }

  if(Object.keys(errors).length){
    return res.status(400).json({
      errors,
    })
  }

  next();
}
