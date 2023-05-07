const InputSectionLayout = ({ children, title }) => {
   return (
      <div className="input-section-wrap">
         <p className="title">{title}</p>
         <div className="input-section-container" >
            {children}
         </div>
      </div>
   )
};
export default InputSectionLayout;