import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Extract Data ",
    moreContext: "Extract Data From a contract",
  },
  {
    idea: "Extract Clause",
    moreContext:
      "Extract Clause From a contract",
  },
  {
    idea: "Validate Contract",
    moreContext: " Validate Contract For Specific Information",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
