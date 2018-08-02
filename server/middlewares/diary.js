
export function DiaryMiddleware(req, res, next){

  const errors = {};

  const { entryTitle, entryContent } = req.body;

  if(typeof entryTitle !== "string" || !entryTitle.trim()){
    Object.assign(
      errors, 
      {entryTitle: "This field is required"}
    );
  }

  if(typeof entryContent !== "string" || !entryContent.trim()){
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
