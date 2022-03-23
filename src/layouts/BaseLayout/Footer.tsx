import Select from "components/common/Select";
import { STORES } from "constant";
import { useStore } from "stores";
import shallow from "zustand/shallow";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  const { store, setStore } = useStore(
    (state) => ({ store: state.store, setStore: state.setStore }),
    shallow
  );
  return (
    <div className="bg-white sticky bottom-0 min-h-[70px] px-4 py-2 shadow-md border-t">
      <div className="flex flex-col text-center space-y-3 md:space-y-0 md:flex-row items-center justify-between h-full">
        <div className="text-xs text-slate-400">© 2022 Demo</div>
        <div className="text-xs text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
          accusantium.
        </div>
        <Select
          options={STORES}
          handleOnChange={setStore}
          value={store.value}
        />
      </div>
    </div>
  );
};

export default Footer;
