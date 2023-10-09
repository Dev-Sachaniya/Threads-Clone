import { useToast } from "@chakra-ui/toast";
const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToast;
