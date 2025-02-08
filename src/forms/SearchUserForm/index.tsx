import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";

import { searchTermAtom } from "@/store/atoms";

import { SearchUserFormSchema, TSearchUserForm } from "./schema";

const SearchUserForm = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  const { control, handleSubmit, formState } = useForm<TSearchUserForm>({
    resolver: zodResolver(SearchUserFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: TSearchUserForm): void => {
    setSearchTerm(data.query);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="query"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Search GitHub users"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!formState.isValid}
          fullWidth
          sx={{ my: 2 }}
        >
          Search
        </Button>
      </form>
      {searchTerm && (
        <Typography variant="body1">Showing users for: {searchTerm}</Typography>
      )}
    </Container>
  );
};

export default SearchUserForm;
