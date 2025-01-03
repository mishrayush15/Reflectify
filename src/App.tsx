import { RecoilRoot} from "recoil";
import { Label } from "./components/Label";
import { Quote } from "./components/Quote";
import { Timer } from "./components/Timer";
import { Music } from "./components/Music";


export const App = () => {
  return (
    <RecoilRoot>
      <div className="bg-[#FFFBEF] h-screen w-full flex flex-col">
        <Label />
        <Quote />
        <Timer />
        <Music/>
      </div>
    </RecoilRoot>
  );
};
