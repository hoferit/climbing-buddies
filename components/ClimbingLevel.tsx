<FormField
  control={form.control}
  name="climbinglevel"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Climbing Level</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select the difficulty range you currently climb in" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="v1-v3">Beginners(V1-V3)</SelectItem>
          <SelectItem value="v4-v6">Intermediate(V4-V6)</SelectItem>
          <SelectItem value="v7-v9">Advanced(V7-V9)</SelectItem>
          <SelectItem value="v10-v12">Pro(v10-V12)</SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>;
