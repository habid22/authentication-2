import { Box, Center, FormControl, FormLabel, FormErrorMessage, Heading, Input, Button, Link, Text} from "@chakra-ui/react";
import {DASHBOARD, REGISTER} from "../../lib/routers";
import {Link as RouterLink, redirect} from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../utils/form-validate";

console.log("test")

export default function Login() {
    const {login, isLoading} = useLogin();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    async function handleLogin(data) {
        const succeeded = await login({email: data.email, password: data.password, redirectTo: DASHBOARD});
        
        if (succeeded) reset();
        

    }





    return ( <Center w="100%" h="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size = "lg" textAlign="center"> 
            Log In 
            </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
            
            <FormControl isInvalid={errors.email} py="2">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" {...register('email', emailValidate)}/>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} py="2">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" {...register('password', passwordValidate)}/>
                <FormErrorMessage>{errors.password && errors.password.message} </FormErrorMessage>
            </FormControl>
            <Button mt="4" type="submit" colorScheme="teal" size="md" w="full"  isLoading={isLoading}  loadingText="Logging In">
                Log In
            </Button>
        </form>
        
        <Text fontSize="xlg" align="center" mt="6">
            Don't have an account?{" "}
            <Link
            as={RouterLink} 
            to={REGISTER}
            color = "teal.800"
            fontWeight={"medium"}
            textDecor={"underline"}
            _hover={{background: "teal.100"}}
        >
                Register
            </Link> {" "}
            instead!
        </Text>   


        </Box>
    </Center>
);

}